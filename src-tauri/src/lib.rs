use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct DesktopEvent {
    name: String,
    properties: Option<serde_json::Value>,
}

#[tauri::command]
fn app_ready() -> bool {
    true
}

#[tauri::command]
fn log_desktop_event(event: DesktopEvent) -> DesktopEvent {
    event
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_ready, log_desktop_event])
        .run(tauri::generate_context!())
        .expect("failed to run David desktop app");
}
