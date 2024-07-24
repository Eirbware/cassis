export function isBodyWithProps<B, P extends string[]>(
  body: B,
  props: P
): body is B & { [key in P[number]]: unknown } {
  return (
    typeof body === 'object' && body !== null && props.every((prop) => Object.hasOwn(body, prop))
  )
}
