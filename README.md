# LCG Encoder
An example of simple encryption based on XOR and [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator) which has no cryptographic strength.

<b>Algorithm:</b>
<br>
<i>encode:</i> message ^ key = encrypted_message,
<br>
<i>decode:</i> encrypted_message ^ key = message,
<br>
where the key is the result of LCG

