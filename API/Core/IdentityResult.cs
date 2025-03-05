using Microsoft.AspNetCore.Identity;

namespace API.Core;

public class IdentityResult<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public IEnumerable<IdentityError>? Error { get; set; }
    public int Code { get; set; }
    public static IdentityResult<T> Success(T value) => new() { IsSuccess = true, Value = value };

    public static IdentityResult<T> Failure(IEnumerable<IdentityError> errors, int code) => new()
    {
        IsSuccess = false,
        Code = code,
        Error = errors,

    };



}