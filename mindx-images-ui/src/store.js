import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  }
})

// store tập trung toàn bộ state dùng chung
// khác biệt context
// 1. Context tạo dc nhiều context >< Store chỉ có một
// 2. Context có thể ở nhiều vị trí (tầng) khác nhau >< Store lúc nào cũng ở tầng cao nhất 