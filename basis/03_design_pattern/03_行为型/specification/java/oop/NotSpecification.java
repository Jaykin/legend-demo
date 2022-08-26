public class NotSpecification<T> extends CompositeSpecification<T> {
    private ISpecification<T> oneSpecification;

    public OrSpecification(ISpecification<T> one) {
        this.oneSpecification = one;
    }

    @Override
    public Boolean isSatisfiedBy(T candidate) {
        return !this.oneSpecification.isSatisfiedBy(candidate);
    }
}
