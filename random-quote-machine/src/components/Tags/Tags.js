import React, { Component } from 'react';
import clsx from 'clsx';

import './Tag.css';

const tags = [
  'business',
  'education',
  'faith'
]
// activeTags = { 'business': 0 }
class Tags extends Component {
  handleChangeTag = (tagName) => {
    this.props.handleChangeTag(tagName)
  }

  render() {
    const { activeTags } = this.props;

    return (
      <div className="Tags">
        {tags.map(tagName => {
          const cls = clsx('Tag', { active: activeTags.includes(tagName)});
          return (
            <span
              key={tagName}
              className={cls}
              onClick={() => this.handleChangeTag(tagName)}
            >
              {tagName}
            </span>
          )
        })}
      </div>

    )
  }
}

export default Tags;