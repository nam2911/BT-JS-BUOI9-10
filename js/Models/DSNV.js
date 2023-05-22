function DSNV() {
  this.arr = [];

  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  this.timViTri = function (tknv) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.tknv === tknv) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.xoaNV = function (tknv) {
    var index = this.timViTri(tknv);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.layThongTinNV = function (tknv) {
    var index = this.timViTri(tknv);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  };

  this.capNhatNV = function (nv) {
    var index = this.timViTri(nv.tknv);
    if (index !== -1) {
      this.arr[index] = nv;
    };
  }
}

DSNV.prototype.timNV = function (keyword) {
  var mangTimKiem = [];
  for (var i = 0; i < this.arr.length; i++) {
    var nv = this.arr[i];
   var keywordToLowerCase = keyword.toLowerCase();
   var xepLoaiToLowerCase = nv.xepLoai.toLowerCase();
    if (xepLoaiToLowerCase.indexOf(keywordToLowerCase) !== -1) {
      mangTimKiem.push(nv);
    }
  }
  return mangTimKiem;
}