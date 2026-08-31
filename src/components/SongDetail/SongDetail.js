import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 10px 25px;
  border-radius: ${props => props.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 25px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateX(-5px);
  }
`;

const DetailCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xlarge};
  padding: 35px;
  box-shadow: ${props => props.theme.shadows.large};
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 3px solid #f0f0f0;
  padding-bottom: 20px;
`;

const DetailIcon = styled.div`
  font-size: 3em;
  width: 70px;
  height: 70px;
  background: #f5f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailTitle = styled.h1`
  color: ${props => props.theme.colors.black};
  font-size: 2em;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DetailRow = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.gray};
  min-width: 120px;
`;

const DetailValue = styled.span`
  color: ${props => props.theme.colors.black};
`;

const DescriptionRow = styled(DetailRow)`
  flex-direction: column;
  gap: 10px;
`;

const DescriptionText = styled.p`
  line-height: 1.6;
  color: #444;
  margin: 0;
`;

const AlbumCover = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: 20px;
  box-shadow: ${props => props.theme.shadows.small};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme.colors.error};
`;

const SongDetail = () => {
  const { id } = useParams();
  
  const { data, loading, error } = useFetch(
    `https://theaudiodb.com/api/v1/json/2/album.php?m=${id}`
  );

  if (loading) {
    return (
      <DetailContainer>
        <LoadingMessage>
          <Spinner />
          <p>Cargando detalles de la canción...</p>
        </LoadingMessage>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <ErrorMessage>
          <p>⚠️ {error}</p>
          <BackButton to="/">← Volver a buscar</BackButton>
        </ErrorMessage>
      </DetailContainer>
    );
  }

  if (!data || !data.album) {
    return (
      <DetailContainer>
        <ErrorMessage>
          <p>🎵 No se encontraron detalles de esta canción</p>
          <BackButton to="/">← Volver a buscar</BackButton>
        </ErrorMessage>
      </DetailContainer>
    );
  }

  const album = data.album[0];

  return (
    <DetailContainer>
      <BackButton to="/">← Volver a buscar</BackButton>
      
      <DetailCard>
        <DetailHeader>
          <DetailIcon>🎵</DetailIcon>
          <DetailTitle>{album.strAlbum || 'Álbum sin título'}</DetailTitle>
        </DetailHeader>
        
        <DetailInfo>
          <DetailRow>
            <DetailLabel>🎤 Artista:</DetailLabel>
            <DetailValue>{album.strArtist || 'Desconocido'}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>💿 Álbum:</DetailLabel>
            <DetailValue>{album.strAlbum || 'Desconocido'}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>📅 Año:</DetailLabel>
            <DetailValue>{album.intYearReleased || 'Desconocido'}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>🏷️ Género:</DetailLabel>
            <DetailValue>{album.strGenre || 'Desconocido'}</DetailValue>
          </DetailRow>
          
          {album.strDescriptionEN && (
            <DescriptionRow>
              <DetailLabel>📝 Descripción:</DetailLabel>
              <DescriptionText>{album.strDescriptionEN}</DescriptionText>
            </DescriptionRow>
          )}
        </DetailInfo>
        
        {album.strAlbumThumb && (
          <AlbumCover 
            src={album.strAlbumThumb} 
            alt={album.strAlbum} 
          />
        )}
      </DetailCard>
    </DetailContainer>
  );
};

export default SongDetail;