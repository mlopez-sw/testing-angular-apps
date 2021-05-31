import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  beforeEach(() => {
    component = new VoterComponent();
  });

  it('should get totalVotes properly', () => {
    component.myVote = 1;
    component.othersVote = 3;

    expect(component.totalVotes).toEqual(4);
  });

  describe('When I upvote,', () => {
    it('should increment total votes', () => {
      component.upVote();

      expect(component.totalVotes).toBe(1);
    });

    it('should NOT increment total votes if myvote is 1', () => {
      component.myVote = 1;

      component.upVote();

      expect(component.totalVotes).toBe(1);
    });

    it('should raise an event', () => {
      let eventData = {};
      component.myVoteChanged.subscribe((voteEvent) => (eventData = voteEvent));

      component.upVote();

      expect(eventData).toEqual({ myVote: 1 });
    });

    it('should NOT raise an event if I have already submitted a positive vote', () => {
      component.myVote = 1;
      let eventData = null;
      component.myVoteChanged.subscribe((voteEvent) => (eventData = voteEvent));

      component.upVote();

      expect(eventData).toBeNull();
    });
  });
});
