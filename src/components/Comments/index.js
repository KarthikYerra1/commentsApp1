import {Component} from 'react'
import './index.css'
import {v4 as uniqueId} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    commentorName: '',
    commentInput: '',
    count: 0,
  }

  onChangeNameInput = event => {
    this.setState({commentorName: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()
    const {commentorName, commentInput, commentsList} = this.state
    const randomColorClassName = `initial-color ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uniqueId(),
      name: commentorName,
      comment: commentInput,
      date: new Date(),
      initialClassName: randomColorClassName,
      isLiked: false,
    }

    this.setState({
      commentsList: [...commentsList, newComment],
      commentorName: '',
      commentInput: '',
    })

    this.setState(prevState => ({count: prevState.count + 1}))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteButton = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(each => each.id !== id)
    this.setState({
      commentsList: filteredCommentsList,
    })
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    const {commentorName, commentInput, commentsList, count} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="upper-container">
          <div className="left-container">
            <p className="description">Say something about 4.0 Technologies</p>
            <form
              onSubmit={this.onClickAddComment}
              className="inputs-container"
            >
              <input
                className="name-input"
                value={commentorName}
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="8"
                cols="35"
                className="comment-input"
                value={commentInput}
                placeholder="Your Comment"
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
          </div>

          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>

        <hr className="line" />
        <div className="count-of-comments">
          <div className="count-container">
            <p className="number">{count}</p>
          </div>
          <p className="no-of-comments">Comments</p>
        </div>

        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              onDeleteButton={this.onDeleteButton}
              commentsItem={eachComment}
              key={eachComment.id}
              toggleIsLiked={this.toggleIsLiked}
              firstLetter={eachComment.name.slice(0, 1)}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
