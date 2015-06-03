import React from 'react'
import Hello from './hello'

console.log(Hello)

React.render(
    <Hello name="World" />,
    document.getElementById('react')
);