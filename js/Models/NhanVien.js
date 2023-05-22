function NhanVien(
  _tkNV,
  _tenNV,
  _email,
  _matKhauNV,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam,

) {
  this.tknv = _tkNV;
  this.name = _tenNV;
  this.email = _email;
  this.password = _matKhauNV;
  this.datepicker = _ngayLam;
  this.luongCB = _luongCB;
  this.chucvu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";

  this.tinhTongLuong = function () {
    if (this.chucvu === "Sếp") {
      this.tongLuong = this.luongCB * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      this.tongLuong = this.luongCB * 2;
    } else if (this.chucvu === "Nhân viên") {
      this.tongLuong = this.luongCB;
    } else {
      this.tongLuong = 0;
    }
  }

  this.xepLoai = function () {
    if (this.gioLam >= 192) {
      this.xepLoai = "Xuất sắc";
    } else if (this.gioLam >= 176) {
      this.xepLoai = "Giỏi";
    } else if (this.gioLam >= 160) {
      this.xepLoai = "Khá";
    } else {
      this.xepLoai = "Trung bình";
    }
  }
}



