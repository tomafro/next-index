import React from 'react';

export class Entry extends React.Component {
  static fromEntry([path, entry]) {
    const { default: content, ...rest } = entry
    const Content = entry.default
    return <Entry key={path} path={path} {...rest}><Content/></Entry>
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

function compare(a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }

  return 0
}

export class Collection extends Array {
  sortBy(f) {
    return this.sort((a, b) => compare(f(a), f(b)))
  }
}
