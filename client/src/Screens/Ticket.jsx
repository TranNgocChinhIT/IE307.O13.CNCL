import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { useTicketContext } from '../navigators/DataContext';

const Ticket = () => {
    const { ticketDataContext } = useTicketContext();

    useEffect(() => {
        // You can access ticketDataContext here and perform any actions
        console.log('Ticket Data:', ticketDataContext);
    }, [ticketDataContext]);

    return (
        <View style={styles.container}>
            <FlatList
                data={ticketDataContext}
                keyExtractor={(item, index) => index.toString()} // Use index as a key for simplicity
                style={styles.productList}
                renderItem={({ item }) => (
                    <View style={styles.ticketItem}>
                        <View style={{ flexDirection: 'row' }}>

                            <Image style={styles.image} source={{ uri: item.note.imagePath }}>

                            </Image>
                            <View style={{ flexDirection: 'column', marginLeft: 10, }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.note.title}</Text>

                                <Text>{item.time} {item?.date &&
                                    `${item.date.day}, ${item.date.date}/${item.month
                                    }/${item.year}`
                                }</Text>
                                
                                <Text>

                                    Seats: {item?.seatArray.slice(0, 3).map((item, index, arr) => (
                                        <React.Fragment key={index}>
                                            {item}
                                            {index === arr.length - 1 ? '' : ', '}
                                        </React.Fragment>
                                    ))}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal:10,
        marginTop:10,
    },
    productList: {
        // Add styles for FlatList if needed
    },
    ticketItem: {
        // Add styles for each ticket item if needed
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
    }
});

export default Ticket;
