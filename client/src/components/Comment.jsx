function Comment({ comment }) {
  console.log(comment);
  return (
    <div className="shadow bg-white rounded-sm p-2">
      <h2 className="font-semibold text-lg">{comment.user}</h2>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;
