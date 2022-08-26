public class AndSpecification<T> extends CompositeSpecification<T> {
    private ISpecification<T> lefSpecification;
    private ISpecification<T> rightSpecification;

    public AndSpecification(ISpecification<T> left, ISpecification<T> right) {
        this.lefSpecification = left;
        this.rightSpecification = right;
    }

    @Override
    public Boolean isSatisfiedBy(T candidate) {
        return this.lefSpecification.isSatisfiedBy(candidate) 
            && this.rightSpecification.isSatisfiedBy(candidate);
    }
}
