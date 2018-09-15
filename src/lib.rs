extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
mod game; mod vec2; mod physics;
use game::State;
use std::{mem, os::raw::c_void, ffi::CString};

extern {
  fn output(ptr: *const u8);
}

fn output_data(data: &str) {
  unsafe {
    let c_str = CString::new(data).unwrap();
    output(c_str.as_ptr() as *const u8);
  }
}

#[no_mangle]
pub extern "C" fn run() {
  output_data(&String::from("{\"msg\": \"Hello World!\"}"));  
}

#[no_mangle]
pub extern "C" fn malloc(size: usize) -> *mut c_void {
  let mut buf = Vec::with_capacity(size);
  let ptr = buf.as_mut_ptr();
  mem::forget(buf);

  return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn free(ptr: *mut c_void, cap: usize) {
  unsafe {
    let _buf = Vec::from_raw_parts(ptr, 0, cap);
  }
}

#[no_mangle]
pub extern "C" fn frame(ptr: *mut u8, len: usize, t: f32, dt: f32) {

  let state_data = unsafe { String::from_raw_parts(ptr, len, len) };

  // assert_eq!(state_data, "[1,2,3]");
  
  let state: State = serde_json::from_str(&state_data).expect("deserialization error");
  let json = serde_json::to_string(&state.update(t, dt)).expect("serialization error");


  let val: &str = json.as_ref();

  let c_str = CString::new(val).unwrap();
  output_data(c_str.to_str().unwrap());
}