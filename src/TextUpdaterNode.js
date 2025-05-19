import React, { useState, useEffect } from 'react';

function TextUpdaterNode({ data, id }) {
  const [value, setValue] = useState(data.label);

  useEffect(() => {
    data.onChange && data.onChange(id, value);
  }, [value]);

  return (
    <div style={{ padding: 10, border: '1px solid #999', borderRadius: 5, background: '#fff' }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ border: 'none', outline: 'none', width: '100%' }}
      />
    </div>
  );
}

export default TextUpdaterNode;
