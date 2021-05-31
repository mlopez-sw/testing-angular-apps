import { LikeComponent } from './like.component';

describe('likeComonent', () => {
  let component: LikeComponent;
  beforeEach(() => {
    component = new LikeComponent();
  });
  it("should toggle the like property's value when clicked", () => {
    component.click();

    expect(component.iLike).toBe(true);
  });

  it('should decrement totalLikes if clicked and iLike is true', () => {
    component.iLike = true;
    component.totalLikes = 0;
    component.click();

    expect(component.totalLikes).toBe(-1);
  });

  it('should increment totalLikes if clicked and iLike is false', () => {
    component.iLike = false;
    component.totalLikes = 0;
    component.click();

    expect(component.totalLikes).toBe(1);
  });
});
