// #![feature(use_extern_macros)]

#![allow(unused_variables)]
#![allow(dead_code)]

extern crate wasm_bindgen;
extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

mod game;
mod vec2;
mod physics;

use wasm_bindgen::prelude::*;
use game::State;

#[wasm_bindgen(js_namespace = console)]
extern "C" {
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn frame(state_data: String, t: f32, dt: f32) -> String {
  let state: State = serde_json::from_str(&state_data).expect("deserialization error");
  let json = serde_json::to_string(&state.update(t, dt)).expect("serialization error");

  json
}