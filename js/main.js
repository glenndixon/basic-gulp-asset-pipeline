import React from 'react'
import flux from 'flux'
import Hello from './hello'

console.log(Hello)
console.log(flux)

React.render(
    <Hello name="World" />,
    document.getElementById('react')
);