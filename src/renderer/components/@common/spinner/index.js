import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Spinner({ size = 24, color = '#949BA4' }) {
  return <Flex justify='center' align='center'>
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size,
            color,
          }}
          spin
        />
      }
    />
  </Flex>
}

export default Spinner;