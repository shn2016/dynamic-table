import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReadMe from '../../assets/README.md';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { input: '' };
  }

  componentDidMount() {
    fetch(ReadMe)
      .then((response) => response.text())
      .then((text) => {
      this.setState({ input: text })
    })
  }

  render() {
    const { input } = this.state;
    return  <ReactMarkdown source={input} />;
  }
}

export default Home;