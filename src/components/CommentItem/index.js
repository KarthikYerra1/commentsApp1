import {formatDistanceToNow as dtt} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentsItem, onDeleteButton, toggleIsLiked, firstLetter} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentsItem

  const onDeleteDelete = () => {
    onDeleteButton(id)
  }

  const onClickLikedButton = () => {
    toggleIsLiked(id)
  }

  const likeText = isLiked ? 'liked' : ''

  const likeImage = isLiked ? (
    <div className="btn">
      <img
        src="https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
        alt="liked"
        className="img"
      />
      <p className={`like-text ${likeText}`}>Like</p>
    </div>
  ) : (
    <div className="btn">
      <img
        src="https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"
        alt="not liked"
        className="img"
      />
      <p className={`like-text ${likeText}`}>Like</p>
    </div>
  )

  return (
    <li className="comment-list-container">
      <div className="comment-upper-container">
        <div className={initialClassName}>
          <p className="initial">{firstLetter}</p>
        </div>
        <div className="comment-side-container">
          <div className="name-distance-container">
            <h1 className="username">{name}</h1>
            <p className="distance-to-time">{dtt(date)}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>

      <div className="comment-lower-container">
        <button type="button" className="button" onClick={onClickLikedButton}>
          {likeImage}
        </button>

        <button
          className="button"
          data-testid="delete"
          type="button"
          onClick={onDeleteDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="img"
            alt="Delete"
          />
        </button>
      </div>
      <hr className="list-line" />
    </li>
  )
}

export default CommentItem
