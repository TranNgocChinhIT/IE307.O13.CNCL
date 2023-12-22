import React from 'react';

import { Text, View, StyleSheet, Linking,Button } from 'react-native';
const openYouTubeApp = () => {
    // Tạo URL cho ứng dụng YouTube với video ID
    const youtubeUrl = `https://www.youtube.com/watch?v=ygvNCEbMusE`;

    // Mở URL trong trình duyệt mặc định của thiết bị
    Linking.openURL(youtubeUrl).catch((err) =>
        console.error('Error opening YouTube:', err)
    );
};
const News = () => {

    return (
        <View style={styles.container}>
            <Text>
                <Button
                    title="Open YouTube Video"
                    onPress={openYouTubeApp}
                />
            </Text>

        </View>
    )
};
const styles = StyleSheet.create({
    container: {},
});

export default News;
