import CountUp from 'react-countup'

export const CountUpDemo = () => {
  return (
    <div>
      <CountUp start={0} end={1000_000_000} duration={5} prefix="$" suffix="USD" separator="," />
    </div>
  )
}
