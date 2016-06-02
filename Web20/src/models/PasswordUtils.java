package models;

import java.security.MessageDigest;
import java.security.SecureRandom;

import javax.xml.bind.DatatypeConverter;

public abstract class PasswordUtils
{
	public static String encrypt(String password)
	{
		String salt = getRandomSalt();
		
		return salt + hash(password, salt);
	}

	public static String getSalt(String str)
	{
		byte[] bytes = toByteArray(str);
					
		byte[] saltBytes = new byte[8];
		for (int n = 0; n < saltBytes.length; n++)
		{
			saltBytes[n] = bytes[n];
		}
		return toHexString(saltBytes);
	}
	
	// ***** HELPERS *****
	
	private static String hash(String password, String salt)
	{
		try
		{
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			
			messageDigest.update((salt + password).getBytes("UTF-8"));
			for (int n = 0; n < 1000; n++)
			{
				messageDigest.update(messageDigest.digest());
			}
			
			return toHexString(messageDigest.digest());
		}
		catch (Exception e) // For NoSuchAlgorithmException (MD5) and UnsupportedEncodingException (UTF-8).
		{ // This exception wont be thrown, since MD5 and UTF-8 are valid.
			System.err.println(e.getMessage());
			return null;
		}
	}
	
	private static String getRandomSalt()
	{
		byte[] salt = new byte[8];
		
		(new SecureRandom()).nextBytes(salt);
		
		return toHexString(salt);
	}
	
	// ***** WRAPPERS *****
	
	private static String toHexString(byte[] bytes) 
	{
	    return DatatypeConverter.printHexBinary(bytes);
	}

	private static byte[] toByteArray(String str) 
	{
	    return DatatypeConverter.parseHexBinary(str);
	}
}
