import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function DescripTypScreen({ navigation, route }) {

  console.log(route.params);

  const {title, city, date, content, pictures, category, author} = route.params;

const BACKEND = 'https://cityps-back.vercel.app'; // En ligne Vercel
// const BACKEND = 'http://192.168.142.202:3000'

  const images = pictures.map((image, i) => {
    return <Image source={{uri : image}} key={i} style={styles.image}/>
  })  

  console.log("images", images)

  return (
    <View style={styles.mainContainer}>
      <View>
      <Image source={require('../assets/descriptypsColor.png')}/>
          <View style={styles.tipsList} >
            <Image source={{uri : author.photo}}  style={styles.avatar} />
                  <Text style={styles.title}> {title} </Text>
                  <Text style={styles.place}> {city} </Text>
                  {/* <Text style={styles.category}> {category} </Text> */}
                  {/* <Text style={styles.date}> {date} </Text> */}
          </View>
      </View>
      <View >
        <View style={styles.imageContainer}>
      {images}
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.text}>{content}</Text>
              <View style={styles.icons}>
                <View style={styles.like}>
                  <Icon name='thumbs-up' size={40} color='#475059' style={styles.menuIcon}/>
                  <Icon name='thumbs-down' size={40} color='#475059' style={styles.menuIcon}/>
                </View>
                <View style={styles.books}>
                  <Icon name='map-marker' size={40} color='#475059' style={styles.menuIcon}/>
                  <Icon name='book' size={40} color='#475059' style={styles.menuIcon}/>
                </View>
              </View>
          </View>
        </View>
   </View>
 );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#77D0DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsList:  {
    // alignItems: 'flex-start',
    // flexDirection: "column",
    // flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#F77B55",
    borderWidth: 2,
    margin: 4,
    backgroundColor: "#D6F5FA",
    alignItems: "center",
    height: 80,
    width: 370
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  imageContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  image:{
    width: 150,
    height: 150,
    margin: 2
  },
  iconContainer:{
    backgroundColor: "#D6F5FA",
    width:370,
    borderRadius: 10,
    margin: '2%'
  },
  icons:{
    // flex:1, 
    // flexDirection: 'row',
    // justifyContent: 'space-between'
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  menuIcon:{
    color :'#77D0DE'
  },
  like:{
    flex: 1,
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  books:{
    flex : 1,
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});