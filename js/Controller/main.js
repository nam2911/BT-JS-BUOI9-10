// Tao doi tuong dsnv tu lop doi tuong DSNV
var dsnv = new DSNV();
// Tao doi tuong Validation tu lop doi tuong Validation 
var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  // Lấy thông tin từ uer 
  var _tkNV = getEle("tknv").value;
  var _tenNV = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhauNV = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;


  var isValid = true;

  if (isAdd) {
  // Validation tkNV
  isValid &=
    validation.kiemTraRong(_tkNV, "tbTKNV", "(*) Vui lòng nhập Tài khoản nhân viên") &&
    validation.kiemTraDoDaiKiTu(_tkNV,
      "tbTKNV",
      "(*) Vui lòng nhập 4 - 6 kí tự",
      4,
      6
    ) && validation.kiemTraTKNVTonTai(_tkNV, "tbTKNV", 
    "(*) Tài khoản nhân viên đã tồn tại",
    dsnv.arr);
  }
    

  // Validation tenNV
  isValid &= 
  validation.kiemTraRong(_tenNV, "tbTen", "(*) Vui lòng nhập Tên nhân viên") &&
  validation.kiemTraChuoiKiTu(_tenNV, "tbTen", "(*) Vui lòng nhập Chuỗi kí tự");

 // Validation email
 isValid &= 
 validation.kiemTraRong(_email, "tbEmail", "(*) Vui lòng nhập Email") &&
 validation.kiemTraPattern(
  _email,
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  "tbEmail",
  "(*) Vui lòng nhập Email hợp lệ!"
);

 //Validation MatKhau
 isValid &=
 validation.kiemTraRong(
   _matKhauNV,
   "tbMatKhau",
   "(*) Vui lòng nhập Mật khẩu"
 ) &&
 validation.kiemTraPattern(
   _matKhauNV,
   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
   "tbMatKhau",
   "(*) Vui lòng nhập Mật khẩu bao gồm chữ cái viết thường, VIẾT HOA, số và ký tự!"
 );

 //Validation Ngày làm
isValid &= validation.kiemTraRong(
  _ngayLam,
  "tbNgay",
  "(*) Vui lòng nhập ngày bắt đầu làm"
) &&
validation.kiemTraPattern(
  _ngayLam,
  /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/,
  "tbNgay",
  "(*) Vui lòng nhập ngày theo định dạng mm/dd/yyyy!"
);

 // Validation Lương CB
 isValid &=
 validation.kiemTraRong(_luongCB, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản") &&
 validation.kiemTraPattern(
  _luongCB,
  /^(1[0-9]{6,7}|20000000)$/,
  "tbLuongCB",
  "(*) Vui lòng nhập số nguyên dương từ 1 000 000 đến 20 000 000 cho lương cơ bản."
);

 // Validation Chức vụ
isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ")

  //Validation Giờ làm
 // Validation Lương CB
 isValid &=
 validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm") &&
 validation.kiemTraPattern(
  _gioLam,
  /^([8-9][0-9]|1[0-9]{2}|200)$/,
  "tbGiolam",
  "(*) Vui lòng nhập số nguyên từ 80 đến 200 cho số giờ làm trong tháng."
);

  if (!isValid) return null;

  var nv = new NhanVien(
    _tkNV,
    _tenNV,
    _email,
    _matKhauNV,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam
  );
  //  Tính tổng lương 
  nv.tinhTongLuong();
  // Xếp loại 
  nv.xepLoai();

  return nv;
}

function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
    <tr>
    <td>${nv.tknv}</td>
    <td>${nv.name}</td>
    <td>${nv.email}</td>
    <td>${nv.datepicker}</td>
    <td>${nv.chucvu}</td>
    <td>${nv.tongLuong}</td>
    <td>${nv.xepLoai}</td>
    <td>
    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editNV('${nv.tknv}')">Edit</button>
    <button class="btn btn-danger" onclick="deleteNV('${nv.tknv}')">Delete</button>
    </td>
    </tr>
    `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

// Sửa NV 
function editNV(tknv) {
  var nv = dsnv.layThongTinNV(tknv);
  if (nv) {
    getEle("tknv").value = nv.tknv;
    getEle("tknv").disabled = true;
    getEle("name").value = nv.name;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucvu;
    getEle("gioLam").value = nv.gioLam;

    // display #btnCapNhat
    getEle("btnCapNhat").style.display = "inline-block";
    // off #btnThemNV 
    getEle("btnThemNV").style.display = "none";
  }
}

// cập nhật nv  
getEle("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNV(false);
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
})

// reset 
getEle("btnReset").addEventListener("click", function (event) {
  event.preventDefault();
  // display #btnThemNV 
  getEle("btnThemNV").style.display = "inline-block";
  // off #btnCapNhat
  getEle("btnCapNhat").style.display = "none";

  // clear value input 
  getEle("formNV").reset();
  getEle("tknv").disabled = false;

})



// Xoa NV 
function deleteNV(tknv) {
  dsnv.xoaNV(tknv);
  renderTable(dsnv.arr);
  setLocalStorage();
}
getEle("btnThemNV").addEventListener("click", function (event) {
  // Chặn load lại trang
  event.preventDefault();
  var nv = layThongTinNV(true);
  if (nv) {
    // Them NV vao mag arr cua DSNV
    dsnv.themNV(nv);

    renderTable(dsnv.arr);

    setLocalStorage();
  }
});

// Tìm NV
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timNV(keyword);
  renderTable(mangTimKiem);
})

function setLocalStorage() {
  // convert Json => String 
  var dataString = JSON.stringify(dsnv.arr);
  // set localStorage
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  // check condition 
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    // convert String => JSON 
    dsnv.arr = JSON.parse(dataString);
    // render table 
    renderTable(dsnv.arr);
  }
}




























