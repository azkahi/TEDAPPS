import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import Loading from '../components/Loading';

import { loadFontAsync } from '../utils/helper';

import Colors from '../constants/Colors';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await loadFontAsync();
    this.setState({ loading: false });
  }

  render() {

    const { navigation, item, horizontal, full, style, imageStyle, disabled, disabledImage, ctaDisabled, onPress, noMarginBottom } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, style, ctaDisabled ? {marginBottom: 0, margin: 0} : null, noMarginBottom ? {marginBottom: -2.5, margin: 0} : null];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    if (this.state.loading) {
      return (<Loading />);
    } else {
      return (
        <Block row={horizontal} card flex style={cardContainer}>
          <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.buttonContainer}>
            <Image
              source={item.classImg}
              style={[styles.imageButton, ctaDisabled ? {height: 92} : null]}
              resizeMode='stretch'
            />
            <View style={styles.textView}>
              <Text style={[styles.cardTitle, item.textColor ? {color: item.textColor} : null]}>{item.title}</Text>
              { ctaDisabled ? null : <Text style={[styles.ctaStyle, item.textColorCta ? {color: item.textColorCta} : null, item.bgCta ? {backgroundColor: item.bgCta} : null]} bold>{item.cta}</Text> }
            </View>
            {
              disabledImage ? <Image source={item.classImg} style={[styles.imageButton, { tintColor: 'gray', position: 'absolute', opacity: 0.8 }, ctaDisabled ? {height: 92} : null]} resizeMode='stretch' /> : null
            }
          </TouchableOpacity>
          {/* <TouchableWithoutFeedback>
            <Block flex style={imgContainer}>
              <Image source={item.image} style={imageStyles} />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block flex space="between" style={styles.cardDescription}>
              <Text size={14} style={styles.cardTitle}>{item.title}</Text>
              <Text size={12} style={styles.ctaStyle} bold>{item.cta}</Text>
            </Block>
          </TouchableWithoutFeedback> */}
        </Block>
      );
    }
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flexWrap: 'wrap',
    fontSize: 16,
    marginTop: 6,
    paddingBottom: 6,
    color: Colors.primaryColor,
    fontFamily: 'UniviaPro-Bold',
    textAlign: 'center',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  ctaStyle: {
    width: 120,
    marginTop: 6,
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.secondaryColor,
    padding: 5,
    fontFamily: 'UniviaPro-Black',
    fontSize: 12,
  },
  imageButton: {
    position: 'absolute',
    height: 122,
    width: '100%',
  },
  textView: {
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
});

export default withNavigation(Card);
