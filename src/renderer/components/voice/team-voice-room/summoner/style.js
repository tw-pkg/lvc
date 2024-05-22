import { Slider } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 230px;
  height: 550px;

  margin: 40px 1vw 0 1vw;
  padding: 16px;
  border-radius: 10px;

  background-color: #313338;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.2);
`;

export const Profile = styled.img`
  position: absolute;
  top: -45px;
  width: 90px;
  height: 90px;

  border-radius: 50%;
  border: 3.5px solid ${({ $visualize }) => ($visualize ? '#50a361' : 'transparent')};
  
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.3);
  filter: brightness(${({ $isMute }) => ($isMute ? 0.7 : 1)});
  transition: border-color 0.1s;
`;

export const Name = styled.p`
  font-size: ${({ $length }) => ($length < 8 ? '16px' : '14px')};
  font-weight: 600;
  color: #F2F3F5;
`;

export const SpeakerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: 100%;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const CustomSlider = styled(Slider)`
  width: 120px;
  margin: 0;
  
  .ant-slider-step {
    height: 8px;
  }
  .ant-slider-rail {
    height: 8px;
    border-radius: 8px;
    background: #4E5057 !important;
  }
  .ant-slider-track {
    height: 8px;
    border-radius: 8px;
    background: #50AB64 !important;
  }
  .ant-slider-handle{
    width: 14px;
    height: 14px;
  }
  .ant-slider-handle::after, 
  .ant-slider-handle:focus:after, 
  .ant-slider-handle:hover:after, 
  .ant-slider-track:hover .ant-slider-handle::after {
    width: 14px;
    height: 14px;
    background-color: #F5F5F5;
    box-shadow: none !important;
    inset-inline-start: 0;
    inset-block-start: 0;
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const AverageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  #info-category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4.5px 0;
    width: 100%;

    p {
      font-size: 16px;
      font-weight: 600;
    }
    #name {
      color: #7f8189;
    }
    #value {
      color: #f2f3f5;
    }
    #most-champ-list {
      display: flex;
      gap: 10px;

      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
`;

export const WinningPercentage = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  #winning-percentage-text {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 14px;
      font-weight: 600;
      color: #7f8189;
    }
    #value {
      color: #e05262;
    }
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  margin-top: 10px;

  progress {
    appearance: none;

    width: 100%;
    height: 22px;

    &::-webkit-progress-bar {
      border-radius: 2px;
      background-color: #e05262;
    }
    &::-webkit-progress-value {
      border-radius: 2px 0 0 2px;
      background-color: #698de7;
    }
  }

  p {
    position: absolute;
    top: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #f2f3f5;
  }
  #win {
    left: 8px;
  }
  #fail {
    right: 8px;
  }
`;

export const RecentlyPlayList = styled.div`
  display: flex;
  flex-direction: column;
  
  #category-tag {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    p {
      font-size: 14px;
      font-weight: 600;
      color: #7f8189;
    }
  }

  #game-info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 8px;
    height: 160px;
    
    #play {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    #kda {
      display: flex;
      align-items: center;

      img {
        width: 25px;
        height: 25px;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 25px;
        font-size: 14px;
        font-weight: 600;
        color: #f2f3f5;
      }
    }

    #time {
      font-size: 12px;
      font-weight: 500;
      color: #7f8189;
    }
  }
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 62px;
    height: 62px;
    margin-top: 24px;
    color: #7f8189;
  }
  p {
    margin: 14px;
    font-size: 16px;
    font-weight: 600;
    color: #7f8189;
  }
`;
