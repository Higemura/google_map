// 位置情報取得が成功したら
let success = (pos) => {
  this.nowLat = pos.coords.latitude;
  this.nowLng = pos.coords.longitude;
  // 現在地の緯度・経度を変数に格納
  this.nowLatLng = new google.maps.LatLng(this.nowLat, this.nowLng);

  // マップオプションを変数に格納
  this.mapOptions = {
    zoom: 18,
    center: this.nowLatLng,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };

  // マップオブジェクト作成
  this.map = new google.maps.Map(
    document.getElementById('js-map'),
    this.mapOptions
  );
  
  // マップにマーカーを表示する
  this.nowPosition = new google.maps.Marker({
    map: this.map,
    position: this.nowLatLng,
    icon: {
      url: 'https://higemura.com/wordpress/wp-content/uploads/2018/10/ic_gmap_mylocation.svg',
      scaledSize: new google.maps.Size(32, 32)
    },
    title: '現在地'
  });
}

// 位置情報取得が失敗したら
let error = (err) => {
  // エラーメッセージ
  msg = 'エラーが発生しました: ' + err;
  alert(msg);
}

// getCurrentPositionのオプション
let options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

// 位置情報を取得
navigator.geolocation.getCurrentPosition(success, error, options);