// Import thư viện xử lý dữ liệu của Firebase
import { ref, set } from 'firebase/database';

import { db } from './firebaseConfig';

// Hàm cập nhật trạng thái Bật/Tắt
export const updatePowerStatus = (status :  boolean) => {
    set(ref(db, 'power'), status)
    .then(() => 
        console.log("Trạng thái công tắc đã được cập nhật:", status ? "ON" : "OFF"))
    .catch((error) =>console.error("Lỗi cập nhật trạng thái công tắc:", error));
};
// Hàm cập nhật cường độ sáng
export const updateBrightness = (value : number) => {
    set(ref(db, 'brightness'), value)
    .then(() => console.log("Độ sáng đã được cập nhật:", value))
    .catch((error) => console.error("Lỗi cập nhật độ sáng:", error));
};