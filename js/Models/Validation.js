function Validation() {
  this.kiemTraRong = function (value, tbId, mess) {
    if (value === "") {
      getEle(tbId).style.display = "block";
      getEle(tbId).innerHTML = mess;
      return false;
    }
    getEle(tbId).style.display = "none";
    getEle(tbId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, tbId, mess, min, max) {
    if (min <= value.length && value.length <= max) {
      getEle(tbId).style.display = "none";
      getEle(tbId).innerHTML = "";
      return true;
    }
    getEle(tbId).style.display = "block";
    getEle(tbId).innerHTML = mess;
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, tbId, mess) {
    var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(tbId).style.display = "none";
      getEle(tbId).innerHTML = "";
      return true;
    }
    getEle(tbId).style.display = "block";
    getEle(tbId).innerHTML = mess;
    return false;
  };

  this.kiemTraPattern = function (value, pattern, tbId, mess) {
    if (value.match(pattern)) {
      getEle(tbId).style.display = "none";
      getEle(tbId).innerHTML = "";
      return true;
    }
    getEle(tbId).style.display = "block";
    getEle(tbId).innerHTML = mess;
    return false;
  };

  this.kiemTraTKNVTonTai = function (value, tbId, mess, arr) {
    var exist = false;

    for (var i = 0; i < arr.length; i++) {
      var nv = arr[i];
      if (nv.tknv === value) {
        exist = true;
        break;
      }
    }
    if (exist) {
      getEle(tbId).style.display = "block";
      getEle(tbId).innerHTML = mess;
      return false;
    }
    getEle(tbId).style.display = "none";
    getEle(tbId).innerHTML = "";
    return true;
  };

  this.kiemTraChucVu = function(idSelect, tbId, mess){
if(getEle(idSelect).selectedIndex !== 0){
  getEle(tbId).style.display = "none";
  getEle(tbId).innerHTML = "";
  return true;
}
getEle(tbId).style.display = "block";
getEle(tbId).innerHTML = mess;
return false;
};
}
