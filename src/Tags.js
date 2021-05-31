import { useState } from 'react';
import styled from 'styled-components/macro';

export default function Tags({ tags, onUpdateTags, onDeleteTag }) {
  const [tag, setTag] = useState('');

  function handleChange(event) {
    setTag(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tag);
      setTag('');
    } else if (tag.length === 0 && event.key === 'Backspace') {
      onDeleteTag(tags[tags.length - 1]);
    }
  }
  return (
    <>
      <label htmlFor="tag">Skills</label>
      <Tag>
        <TagCloud>
          {tags &&
            tags.map((tag, index) => (
              <>
                <span key={index + tag}>
                  {tag}
                  <button
                    onClick={() => {
                      onDeleteTag(tag);
                    }}
                  >
                    x
                  </button>
                </span>
              </>
            ))}
          <input
            type="text"
            name="tag"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </TagCloud>
      </Tag>
    </>
  );
}

const Tag = styled.section`
  display: inline-flex;
  flex-basis: content;
  gap: 0.2rem;
  font-family: sans-serif;
  border: 2px groove green;
  padding: 0.5rem;

  input {
    display: inline-flex;
    padding: 0.5rem;
  }

  span {
    margin: 0.2rem;
    background: green;
    color: ivory;
    padding: 0.3rem;
    border-radius: 0.3rem;
  }
`;

const TagCloud = styled.article`
  display: inline-flex;
  flex-wrap: wrap;
`;
