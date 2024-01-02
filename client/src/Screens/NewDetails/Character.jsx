import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
const articlesData = [
  {
    id: '1',
    title: 'PHIM TẾT "GẶP LẠI CHỊ BẦU" HÉ LỘ DÀN DIỄN VIÊN CHÍNH THỨC: ANH TÚ, DIỆU NHI, NGỌC PHƯỚC, QUỐC KHÁNH VÀ LÊ GIANG',
    summary: 'Phim Tết Gặp Lại Chị Bầu chính thức công bố dàn diễn viên chính, bắt đầu màn chạy đà cho cuộc đua phòng vé nhộn nhịp dịp Tết Giáp Thìn 2023',
    image: 'https://cinestar.com.vn/pictures/Tin%20t%E1%BB%A9c/gap-lai-chi-bau.jpg',
    infor1:'Sau các hình ảnh đầu tiên gây sốt trên mạng xã hội, phim Tết Gặp Lại Chị Bầu tiếp tục "thả xích" loạt poster nhân vật vào ngày 7/12, qua đó chính thức "chốt đơn" dàn diễn viên chính: Anh Tú, Diệu Nhi, Ngọc Phước, Quốc Khánh và Lê Giang. Phim là tác phẩm trở lại màn ảnh sau hai năm của "đạo diễn trăm tỷ" Nhất Trung trong vai trò đạo diễn kiêm biên kịch.',
    infor2:'Theo tiết lộ từ ê-kíp, Gặp Lại Chị Bầu sẽ tái hiện bầu không khí đậm chất retro của Sài Gòn thập niên 90, gợi lại trong khán giả xúc cảm nhung nhớ, bồi hồi trong những ngày đầu năm mới... Bởi vậy, loạt poster giới thiệu nhân vật của bộ phim cũng mang tông màu hoài niệm, với những đồ vật xưa cũ mang tính chất biểu tượng của đời sống văn hóa đại chúng tại Sài Gòn những năm 90. ',
    infor3:'Anh Tú xuất hiện trong bộ poster với tạo hình đầu húi cua khác lạ được nhuộm màu vàng kim nổi bật. Ngoại hình của anh chàng khá khác biệt so với phong cách thời trang lúc bấy giờ, ẩn ý về thân phận và tính cách của Phúc. Hóa thân vào vai một diễn viên nghiệp dư yêu nghề nhưng trải qua nhiều thăng trầm trong cuộc sống, Anh Tú hứa hẹn thể hiện nét quyến rũ mới mẻ trong Gặp Lại Chị Bầu. Bên cạnh đó, với sự xuất hiện cây đàn guitar trong poster, khán giả hy vọng sẽ được thấy Anh Tú khoe sở trường ca hát trong phim mới. ',
    infor4:'Thủ vai nữ chính Ngọc Huyền, Diệu Nhi xuất hiện với tạo hình dịu dàng, thanh thuần, khác hẳn với hình tượng hài hước, tràn đầy năng lượng vốn là "thương hiệu" của cô nàng, bởi đây là lần đầu tiên cô sánh vai cùng ông xã Anh Tú trên màn ảnh rộng. Sự biến hóa về hình ảnh của Diệu Nhi càng khiến khán giả tò mò, liệu nữ diễn viên cùng ông xã sẽ có tương tác thú vị như thế nào trên màn ảnh. Bên cạnh đó, tạo hình có vẻ khá "bình thường" cho đến thời điểm hiện tại của Diệu Nhi cũng tạo ra những nghi vấn, liệu "chị bầu" trong tựa phim có liên quan gì đến nhân vật nữ chính Ngọc Huyền hay không.'
  },
  {
    id: '2',
    title: '[Godzilla x Kong: Đế Chế Mới] ',
    summary: 'Trailer đầu tiên của siêu bom tấn 2024 “Godzilla x Kong” chính thức thả xích, hai siêu quái vật càn quét phòng vé trở lại',
    image: 'https://cinestar.com.vn/pictures/Tin%20t%E1%BB%A9c/godzilla1.jpeg',
  },
  {
    id: '3',
    title: '[Aquaman Và Vương Quốc Thất Lạc] - Bom tấn có doanh thu cao nhất vũ trụ DC “Aquaman” chính thức trở lại màn ảnh rộng với phần phim tiếp theo',
    summary: 'Tựa phim thành công nhất của Vũ trụ điện ảnh mở rộng DC sẽ trở lại với phần phim thứ hai sau nửa thập kỉ. Aquaman Và Vương Quốc Thất Lạc (tựa gốc: Aquaman and the Lost Kingdom)',
    image: 'https://cinestar.com.vn/pictures/aqua-1.jpeg',
  },
];

const Character = ({ navigation }) => {
  const renderArticleItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Button Pressed!');
        navigation.navigate('ArticleDetail', { note: item });
      }}
    >
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: 200, marginBottom: 8 }}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          {item.title}
        </Text>
        <Text>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={articlesData}
        keyExtractor={(item) => item.id}
        renderItem={renderArticleItem}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  iconTab: {
    width: 27,
    height: 27,
  },
  iconTabOnPress: {
    width: 40,
    height: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: 20,

  },
  activeTabBackground: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
  },
});
export default Character