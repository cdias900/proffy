import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
// eslint-disable-next-line no-unused-vars
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { Container, List } from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites')
      .then((res) => {
        if (res) {
          setFavorites(JSON.parse(res));
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  return (
    <Container>
      <PageHeader title="Meus proffys favoritos" />
      <List contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
      >
        {favorites.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorite />
        ))}
      </List>
    </Container>
  );
};

export default Favorites;
