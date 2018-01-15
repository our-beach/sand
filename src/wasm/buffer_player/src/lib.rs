#[macro_use]
extern crate lazy_static;

use std::sync::Mutex;
use std::ptr;
use std::f64::consts::PI;

lazy_static! {
    static ref DATA: Mutex<BufferManager> = Mutex::new(BufferManager::new());
}

#[no_mangle]
pub fn write_to(output_buffer: *mut f64, _len: usize) {
    DATA.lock().map(|data| {
        for (index, sample) in data.buffer.iter().enumerate() {
            unsafe {
                ptr::write(output_buffer.offset(index as isize), *sample);
            }
        }
    }).expect("Could not write to output buffer");
}

#[no_mangle]
pub fn update_buffer(new_data: *mut f64, len: usize) {
    let their_data = into_vec(new_data, len);

    DATA.lock()
        .map(|mut our_data| our_data.update_with(&their_data))
        .expect("Could not update buffer");
}

fn into_vec<T>(new_data: *mut T, len: usize) -> Vec<T> {
    unsafe {
        Vec::from_raw_parts(new_data, len, len)
    }
}

struct BufferManager {
    buffer: [f64; 1024],
}

impl BufferManager {
    fn new() -> Self {
        let mut data = [0f64; 1024];

        for index in 0..1024 {
            data[index] = ((index as f64 / 1024f64) * 2f64 * PI).sin();
        }

        BufferManager { buffer: data }
    }

    fn update_with(&mut self, their_data: &Vec<f64>) {
        for (mut our_datum, their_datum) in self.buffer.iter_mut().zip(their_data) {
            *our_datum = *their_datum;
        }
    }
}

