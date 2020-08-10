import React, { useState, useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
// eslint-disable-next-line no-unused-vars
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import {
  Container,
  List,
  Input,
  Label,
  SearchForm,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites')
      .then((res) => {
        if (res) {
          const favArr = JSON.parse(res);
          const favIds = favArr.map((teacher: Teacher) => teacher.id);
          setFavorites(favIds);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  const handleToggleFiltersVisible = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleFiltersSubmit = async () => {
    loadFavorites();
    const response = await api.get<Teacher[]>('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  };

  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
      )}
      >
        {isFiltersVisible && (
        <SearchForm>
          <Label>Matéria</Label>
          <Input
            value={subject}
            onChangeText={setSubject}
            placeholder="Qual a matéria?"
            placeholderTextColor="#c1bccc"
          />

          <InputGroup>
            <InputBlock>
              <Label>Dia da semana</Label>
              <Input
                value={week_day}
                onChangeText={setWeekDay}
                placeholder="Qual dia?"
                placeholderTextColor="#c1bccc"
              />
            </InputBlock>
            <InputBlock>
              <Label>Horário</Label>
              <Input
                value={time}
                onChangeText={setTime}
                placeholder="Qual horário?"
                placeholderTextColor="#c1bccc"
              />
            </InputBlock>
          </InputGroup>

          <SubmitButton onPress={handleFiltersSubmit}>
            <SubmitButtonText>Filtrar</SubmitButtonText>
          </SubmitButton>
        </SearchForm>
        )}
      </PageHeader>
      <List contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorite={favorites.includes(teacher.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default TeacherList;
