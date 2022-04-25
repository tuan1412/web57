import React, { Component } from 'react';
import axios from 'axios';

import './QuoteBox.css';

class QuoteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'idle',
      quote: null,
    }
  }
  
  fetchQuote = async () => {
    try {
      this.setState({ status: 'loading' });

      const res = await axios.get('https://api.quotable.io/random', {
        params: {
          tags: this.props.activeTags.join(',')
        }
      });
      this.setState({
        status: 'success',
        quote: {
          content: res.data.content,
          author: res.data.author
        }
      })
    } catch (err) {
      this.setState({ status: 'error' });
    }
  }

  componentDidMount() {
    this.fetchQuote()
  }

  componentDidUpdate(preProps) {
    if (preProps.activeTags !== this.props.activeTags) {
      console.log('vo day');
      this.fetchQuote()
    }
  }

  // React.useEffect(() => {
  //   fetchQuote();
  // }, [activeTags])

  onRefreshQuote = async () => {
    // console.log('click btn')
    this.fetchQuote()
  }

  renderQuote = () => {
    const { status, quote } = this.state;

    const isIdle = status === 'idle';
    const isLoading = status === 'loading';
    const isError = status === 'error';
    const isSuccess = status === 'success';

    if (isIdle || isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    if (isSuccess) {
      return (
        <>
          <div className="QuoteBox-content">
            {quote.content}
          </div>
          <div className="QuoteBox-author">
            {quote.author}
          </div>
        </>
      )
    }

    if (isError) {
      return (
        <div>Something went wrong</div>
      )
    }

    return null;
  }
  
  render() {
    console.log('render');

    const { activeColor } = this.props;
    return (
      <div className="QuoteBox" style={{ color: activeColor }}>
        {this.props.isShowClock ? 'Đồng hồ đang chạy' : 'Đồng hồ dừng'}
        {this.renderQuote()}
        <div className="QuoteBox-refresh">
          <button 
            style={{ background: activeColor }}
            className="QuoteBox-btn" 
            onClick={this.onRefreshQuote}>
            New Quote
          </button>
        </div>
      </div>
    )
  }
}

export default QuoteBox;
