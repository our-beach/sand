import React from 'react';

export default function Counter(props) {
    return (
      <td className="Counter">
        <tr onClick={ props.increment }>
            +
        </tr>
        <tr>
            { props.counter }
        </tr>
        <tr onClick={ props.decrement }>
            -
        </tr>
      </td>
    );
}
