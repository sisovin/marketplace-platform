import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { Card, Button, Input, Textarea } from '../../../../components/ui';

const StarRating = ({ rating, setRating }) => {
  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRating(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ product_id: productId, rating, review }]);
      if (error) throw error;
      setReview('');
      setRating(0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <h2>Submit a Review</h2>
        <StarRating rating={rating} setRating={setRating} />
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
        {error && <p>Error: {error}</p>}
      </Card>
    </form>
  );
};

export default ReviewForm;
