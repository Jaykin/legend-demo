public interface ISpecification<T> {
    Boolean isSatisfiedBy(T candidate);

    ISpecification<T> And(ISpecification<T> specification);

    ISpecification<T> Or(ISpecification<T> specification);

    ISpecification<T> Not(ISpecification<T> specification);

    // TODO，新加逻辑判断
}
