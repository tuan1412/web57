# Buổi 13

Quan hệ giữa các component
- Cha - con
- Con - cha
- Anh - em

Data => UI => Sự giao tiếp là truyền data qua lại => Component A cần thay đổi giao diện các component B

# Cha - con
Cha truyền props xuống con => Cha thay đổi props => Con thay đổi giao diện
# Con - cha
Cha muốn thay đổi giao diện (tức là cha phải thay đổi props hoặc state)
Con không thể truyền props ngược lên cha
Con cũng không thể thay đổi state của cha (state thằng nào thằng này giữ và sửa)
=> Truyền props là function từ cha xuống con
=> Function có logic update state của cha
# Anh - em
Lifting state up