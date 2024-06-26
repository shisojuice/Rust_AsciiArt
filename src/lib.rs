
use wasm_bindgen::prelude::*;
use image::{GenericImage, ImageBuffer, Rgba};
use image::io::Reader as ImageReader;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn process_image(image_data: &[u8]) -> String {
    // 画像データからImageBufferを作成
    let mut img = ImageReader::new(std::io::Cursor::new(image_data))
        .with_guessed_format()
        .unwrap()
        .decode()
        .unwrap()
        .to_rgba8();

    // セルのサイズ
    let cell_size = 16;
    let mut result = String::new();

    // セルごとに処理
    for y in 0..img.height() / cell_size {
        for x in 0..img.width() / cell_size {
            // セルを切り出す
            let cell = img.sub_image(
                x * cell_size,
                y * cell_size,
                cell_size,
                cell_size,
            );

            // セルを解析
            let recognized_char = analyze_cell(cell.to_image());
            result.push(recognized_char);
            result.push(recognized_char);
        }
        result.push('\n');
    }
    result
}
fn analyze_cell(cell: ImageBuffer<Rgba<u8>, Vec<u8>>) -> char {
    // 黒ピクセルの数をカウント
    let black_pixels = cell.pixels().filter(|p| p[0] == 0 && p[1] == 0 && p[2] == 0 && p[3] != 0).count();

    // 黒ピクセル数に応じて文字を判定
    match black_pixels {
        0..=50 => '-',
        _ => '@',
    }
}