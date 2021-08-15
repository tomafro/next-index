import React from "react";
export class Entry extends React.Component {
  static fromEntry([path, entry]) {
    const { default: _content, ...rest } = entry.module;
    const Content = entry.module.default;
    return <Entry _content={entry.module.default} {...rest}><Content/></Entry>
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
}

export class Collection extends Array {
  sortBy(f) {
    return this.sort((a, b) => compare(f(a), f(b)));
  }
}
