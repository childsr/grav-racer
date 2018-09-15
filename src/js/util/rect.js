const rect = (x, y, w, h) => pt => (
  pt[0] >= x &&
  pt[0] <= x + w &&
  pt[1] >= y &&
  pt[1] <= y + h
)