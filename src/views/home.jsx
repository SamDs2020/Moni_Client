import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { $axios, GetTokenInfo } from "../utilities/helper";
import { styles } from "../styles/home.style";
import { Vendor } from "../components/vendor.component";
import { Layout, TopNavigation, Text, TopNavigationAction, ViewPager } from "react-native-ui-kitten";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Info from "../components/info";
import Carousel from "react-native-snap-carousel";
import Offer from "../components/offer";

export default class Home extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            user: "",
            offers: [],
            news: []
        };
    }

    componentWillMount() {
        GetTokenInfo()
            .then(info => {
                this.setState({ user: info.name });
            })
            .catch(error => console.error(error));
    }

    renderNewsUpdates({ item, index }) {
        return <Info imagePath={item.imagePath} title={item.title} content={item.content}></Info>;
    }
    renderOffersUpdates({ item }) {
        return <Offer imagePath={item.imagePath} offerPoints={item.offerPercentage}></Offer>;
    }

    renderCustomerCareAction() {
        return (
            <TopNavigationAction
                icon={() => (
                    <TouchableOpacity>
                        <Image
                            style={{ resizeMode: "contain", height: 40, width: 40 }}
                            source={require("../../assets/icons/customer.png")}
                        />
                    </TouchableOpacity>
                )}
            />
        );
    }

    async componentDidMount() {
        const axiosInstance = await $axios();
        // Get Offers
        axiosInstance
            .get("/offer")
            .then(res => {
                this.setState({ ...this.state, offers: res.data });
            })
            .catch(error => {
                console.log(error.response.data.error);
            })
            .then(_ => {
                // Get News
                axiosInstance
                    .get("/news")
                    .then(res => {
                        this.setState({ ...this.state, news: res.data });
                    })
                    .catch(error => {
                        console.log(error.response.data.error);
                    });
            });
    }

    render() {
        const { width, height } = Dimensions.get("window");
        return (
            <>
                <TopNavigation
                    rightControls={this.renderCustomerCareAction()}
                    alignment="center"
                    title={this.state.user ? `Hi! ${this.state.user}` : "Hello!"}
                    titleStyle={{ fontSize: 20 }}
                />
                <Layout>
                    <View style={styles.rootContainer}>
                        <View>
                            <Carousel
                                layout="default"
                                ref={c => (this._carousel = c)}
                                data={this.state.news}
                                renderItem={({ item, index }) => this.renderNewsUpdates({ item, index })}
                                sliderWidth={width}
                                itemWidth={width / 2 + 30 * 2}
                                firstItem={1}
                                loop={true}
                            ></Carousel>
                        </View>
                        <View style={styles.offerContainer}>
                            <Text category="h5">Offers</Text>
                            <View>
                                <FlatList
                                    data={this.state.offers}
                                    horizontal={true}
                                    renderItem={({ item }) => this.renderOffersUpdates({ item })}
                                    keyExtractor={item => item._id}
                                ></FlatList>
                            </View>
                        </View>
                    </View>
                </Layout>
            </>
        );
    }
}
