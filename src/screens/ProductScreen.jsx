import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import GlobalSafeareaStyle from "../utils/GlobalSafeareaStyle";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BottomTabNavigator from "./BottomTab";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartTotal, decrementQuantity, incrementQuantity } from "../redux/features/cartSlice";


const screenWidth = Dimensions.get("window").width;

const ProductScreen = ({ navigation, route }) => {
  const [showDesc, setShowDesc] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const itemData = route.params.itemData;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // console.log(itemData)

  const scrollBtnTapDesc = () => {
    setShowDesc(!showDesc);
  };

  const scrollBtnTapReviews = () => {
    setShowDesc(!showDesc);
  };

  const onTapReadMore = () => {
    setReadMore(!readMore);
  };

  const onTapReadLess = () => {
    setReadMore(!readMore);
  };

  const onTapBack = () => {
    navigation.goBack();
  };
  const onTap = () => {
    Alert.alert("Share");
  };
  const onTapCart = () => {
    navigation.navigate("CartStack");
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

//   const handleIncrement = (item) => {
//     dispatch(incrementQuantity(item))
//   }

//   const handleDecrement = (item) => {
//     dispatch(decrementQuantity(item))
//   }

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      <View style={styles.container}>
        <View style={styles.firstWrapper}>
          <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
            <Ionicons name="chevron-back" size={30} color="#474E68" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={onTap}>
            <Ionicons name="heart-outline" size={30} color="#FD6A65" />
          </TouchableOpacity>
        </View>
        <View style={styles.secondWrapper}>
          {itemData && (
            <Image
              source={{ uri: itemData.images[0] }}
              style={styles.productImage}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.thirdWrapper}>
          <ScrollView>
            <View style={{ padding: 25 }}>
              {itemData ? (
                <View>
                  <View style={styles.flexItemsCenterWrapper}>
                    <View style={styles.flexItemsCenterWrapper}>
                      <Ionicons
                        style={{ paddingRight: 5 }}
                        name="star"
                        color="#FD6A65"
                        size={35}
                      />
                      <Text style={{ fontSize: 18 }}>
                        {itemData.rating} - (22)
                      </Text>
                    </View>
                    <View style={styles.flexItemsCenterWrapper}>
                      <Ionicons
                        style={{ paddingRight: 5 }}
                        name="timer"
                        color="#FD6A65"
                        size={35}
                      />
                      <Text style={{ fontSize: 18 }}>
                        {itemData.readyTime} mins
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.cartBtn}
                        onPress={onTapCart}
                      >
                        <Ionicons name="basket" size={35} color="white" />
                        <View style={styles.badgeStyle}>
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {cart && cart.cartTotalQuantity}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ paddingVertical: 10 }}>
                    <View style={styles.flexItemsCenterWrapper}>
                      <Text style={{ fontSize: 35 }}>{itemData.name}</Text>
                      {/* <View style={styles.flexItemsCenterWrapper}>
                        <TouchableOpacity style={styles.incdecIconStyle} onPress={() => handleIncrement(itemData)}>
                          <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, paddingHorizontal: 15 }}>
                          {itemData.quantity}
                        </Text>
                        <TouchableOpacity style={styles.incdecIconStyle} onPress={() => handleDecrement(itemData)}>
                          <Ionicons name="remove" size={20} color="white" />
                        </TouchableOpacity>
                      </View> */}
                    </View>
                    <Text style={styles.priceText}>৳ {itemData.price}</Text>
                  </View>
                  <View>
                    <View
                      style={{
                        width: 230,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 5,
                          borderBottomWidth: showDesc === true ? 3 : 0,
                          borderBottomColor: showDesc === true ? "#FD6A65" : "",
                        }}
                        onPress={scrollBtnTapDesc}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: showDesc === true ? "#FD6A65" : "black",
                          }}
                        >
                          Description
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 5,
                          borderBottomWidth: showDesc === false ? 3 : 0,
                          borderBottomColor:
                            showDesc === false ? "#FD6A65" : "",
                        }}
                        onPress={scrollBtnTapReviews}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: showDesc === false ? "#FD6A65" : "black",
                          }}
                        >
                          Reviews
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {readMore === true ? (
                      <View style={{ height: 150 }}>
                        {showDesc ? (
                          <View
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 5,
                            }}
                          >
                            <Text style={{ fontSize: 18, color: "#323232" }}>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages
                              but also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </Text>
                            <TouchableOpacity onPress={onTapReadLess}>
                              <Text style={styles.moreLessBtn}>Show Less</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            Weight={{
                              paddingVertical: 10,
                              paddingHorizontal: 5,
                            }}
                          >
                            <Text style={{ fontSize: 18, color: "#323232" }}>
                              Reviews
                            </Text>
                            <TouchableOpacity onPress={onTapReadLess}>
                              <Text style={styles.moreLessBtn}>Show Less</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View style={{ height: 100 }}>
                        {showDesc ? (
                          <View
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 5,
                            }}
                          >
                            <Text style={{ fontSize: 18, color: "#323232" }}>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages
                              but also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </Text>
                            <TouchableOpacity onPress={onTapReadMore}>
                              <Text style={styles.moreLessBtn}>
                                ...ReadMore
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            style={{
                              paddingVertical: 10,
                              paddingHorizontal: 5,
                            }}
                          >
                            <Text style={{ fontSize: 18, color: "#323232" }}>
                              Reviews
                            </Text>

                            <TouchableOpacity onPress={onTapReadMore}>
                              <Text style={styles.moreLessBtn}>
                                ...ReadMore
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                  <View style={{ paddingTop: readMore === true ? 20 : 5 }}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <TouchableOpacity
                        style={styles.addToBagBtn}
                        onPress={() => handleAddToCart(itemData)}
                      >
                        <Ionicons name="basket" size={35} color="white" />
                        <Text style={styles.textStyle}>Add To Bag</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <Text>No Product Found</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  firstWrapper: {
    hight: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
  },
  secondWrapper: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
  productImage: {
    width: "100%",
    height: screenWidth * 0.6,
    padding: 10,
  },
  thirdWrapper: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    // zIndex: 1
  },
  flexItemsCenterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  incdecIconStyle: {
    backgroundColor: "#FD6A65",
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  addToBagBtn: {
    width: "90%",
    height: 60,
    paddingVertical: 10,
    backgroundColor: "#FD6A65",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  cartBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FD6A65",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  moreLessBtn: {
    color: "#FD6A65",
    fontStyle: "bold",
  },
  badgeStyle: {
    position: "absolute",
    top: 5,
    right: 4,
    width: 25,
    height: 25,
    backgroundColor: "#00ABB3",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
});

//#FD6A65

export default ProductScreen;
