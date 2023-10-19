import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
// import Lab1_2 from './components/Lab1_2';

// Lý thuyết
// Các biến cục bộ không tồn tại
// giữa các lần render và các thay
// đổi đối với biến cục bộ không
// kích hoạt re-render

// => State ra đời
// Hook useState:
// Cung cấp 2 thứ:
// 1. Một biến có thể lưu giá trị
// giữa các lần render
// 2. Một hàm để cập nhập giá trị
// của biến và kích hoạt re-render


//21521892 -Trần Ngọc Chinh

const postsData = [
    {
        id: 1,
        avatar: require('./assets/leonui.jfif'),
        username: 'Ngọc Chinh',
        text: 'Leo núi nè... 😀 😃',
        image: 'https://vcdn1-ngoisao.vnecdn.net/2016/07/29/nui2-6373-1469791654.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=W4EtcepKgiT3YFIzru6-pA',
        likes: 123,
        comments: 456,
        shares: 789,
        liked:false,
    },
    {
        id: 2,
        avatar: require('./assets/sea.jfif'),
        username: 'Minh Huy',
        text: 'Halo :))',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhiYYvhaeyCQE2qpv7BA0szEiO1fRr_7Qhg&usqp=CAU',
        likes: 164,
        comments: 356,
        shares: 168,
        liked:false,
    },
    {
        id: 3,
        avatar: require('./assets/phongcanh3.jpg'),
        username: 'Thế Cường',
        text: 'Xia xìa',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBe1M6eolla2M8DW7HUGyUTbAdapJa_QUig&usqp=CAU',
        likes: 222,
        comments: 333,
        shares: 444,
        liked:false,
    },
    {
        id: 4,
        avatar: require('./assets/phongcanh2.jfif'),
        username: 'Le Dung',
        text: 'Xăm bai đi kha',
        image: 'https://image.vtc.vn/files/ctv.kinhte/2019/08/06/biet_thu2-1512428.jpg',
        likes: 987,
        comments: 9876,
        shares: 111,
        liked:false,
    },
];

const Demo06_10 = () => {
    const [posts, setPosts]
        = useState([...postsData]);

        const handleAddComment = (postId) => {
            const updatedPosts = posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: post.comments + 1,
                };
              }
              return post;
            });
          
            setPosts(updatedPosts);
          };
          
          const handleAddShare = (postId) => {
            const updatedPosts = posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  shares: post.shares + 1,
                };
              }
              return post;
            });
          
            setPosts(updatedPosts);
          };
          
          const handleToggleLike = (postId) => {
            const updatedPosts = posts.map((post) => {
              if (post.id === postId) {
                if (post.liked) {
                  return {
                    ...post,
                    likes: post.likes - 1,
                    liked: false,
                  };
                } else {
                  return {
                    ...post,
                    likes: post.likes + 1,
                    liked: true,
                  };
                }
              }
              return post;
            });
          
            setPosts(updatedPosts);
          };

    return (
      // <Lab1_2 />
        <ScrollView style={styles.container}>
            {posts.map((post) => (
                <View style={styles.post} key={post.id}>
                    <View style={styles.postHeader}>
                        <Image
                            source={post.avatar}
                            style={styles.profileImage}
                        />
                        <Text style={styles.username}>{post.username}</Text>
                    </View>

                    <Text style={styles.postText}>{post.text}</Text>
                    <Image
                        source={{ uri: post.image }}
                        style={styles.contentImage}
                    />
                    <View style={styles.statContainer}>
                        <Text>
                            <Text>{post.likes}</Text> Likes</Text>
                        <Text><Text>{post.comments}</Text> Comments</Text>
                        <Text><Text>{post.shares}</Text> Shares</Text>
                    </View>

                    <View style={styles.horizontalLine} />

                    <View style={styles.interactiveContainer}>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={() => handleToggleLike(post.id)}
                        >
                            <Image
                                 source={post.liked ? require('./assets/likeblue.png') : require('./assets/like.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Likes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => handleAddComment(post.id)}
                        >
                            <Image
                                source={require('./assets/comment.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Comments</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress={() => handleAddShare(post.id)}
                        >
                            <Image
                                source={require('./assets/share.png')}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Shares</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default Demo06_10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    post: {
        flex: 1,
        padding: 15,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    postHeader: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    contentImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    postText: {
        fontSize: 12,
        color: '#000',
        marginVertical: 10,
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#f00',
        marginVertical: 10,
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    interactiveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    }
});
