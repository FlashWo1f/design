import React, { memo, useState, useEffect, useRef } from 'react';
import { Button } from 'antd';

const Child = memo((props: any) => {
  console.log('child render...', props.data)
  const [name, setName] = useState(props.data)
  return (
    <div>
      <div>child</div>
      <div>{name} --- {props.data}</div>
    </div>
  );
})
export default function Hook() {
  console.log('Hook render...')
  const [count, setCount] = useState(0)
  const [name, setName] = useState('rose')

  const countRef = useRef(0)
  useEffect(() => {
    console.log('use effect...', count)
    const timer = setInterval(() => {
      console.log('timer...count:', countRef.current)
      setCount(++countRef.current)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <div>
        {count}
      </div>
      <button onClick={() => setCount(count + 1)}>update count </button>
      <button onClick={() => setName('jack')}>update name </button>
      <Child data={name} />
    </div>
  )
}
