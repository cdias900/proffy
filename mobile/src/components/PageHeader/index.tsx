// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import { Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import {
  Container,
  TopBar,
  Title,
  Header,
} from './styles';

interface Props {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, headerRight, children }) => {
  const { navigate } = useNavigation();

  const handleGoBack = () => {
    navigate('Landing');
  };

  return (
    <Container>
      <TopBar>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Image source={logoImg} resizeMode="contain" />
      </TopBar>
      <Header>
        <Title>{title}</Title>
        {headerRight}
      </Header>
      {children}
    </Container>
  );
};

export default PageHeader;
