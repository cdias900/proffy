import React, { useState } from 'react';
import { Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import {
  Container,
  Profile,
  ProfileInfo,
  Avatar,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText,
} from './styles';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface Props {
  teacher: Teacher;
  favorite: boolean;
}

const TeacherItem: React.FC<Props> = ({ teacher, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleLinkToWhatsapp = () => {
    api.post('/connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}`);
  };

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorite) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem: Teacher) => teacherItem.id === teacher.id,
      );

      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorite(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorite(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  };

  return (
    <Container>
      <Profile>
        <Avatar source={{ uri: teacher.avatar }} />

        <ProfileInfo>
          <Name>{teacher.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>
      <Bio>{teacher.bio}</Bio>
      <Footer>
        <Price>
          Preço/hora
          {'   '}
          <PriceValue>
            R$
            {' '}
            {teacher.cost.toFixed(2)}
          </PriceValue>
        </Price>
        <ButtonsContainer>
          <FavoriteButton favorite={isFavorite} onPress={handleToggleFavorite}>
            <Image source={isFavorite ? unfavoriteIcon : heartOutlineIcon} />
          </FavoriteButton>
          <ContactButton onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
