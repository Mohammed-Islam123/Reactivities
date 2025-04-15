using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<BaseActivityDTO, Activity>();
        CreateMap<Attendee, AttendeeProfileDto>()
            .ForMember(a => a.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(a => a.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
            .ForMember(a => a.Bio, opt => opt.MapFrom(src => src.AppUser.Bio))
            .ForMember(dst => dst.Image, opt => opt.MapFrom(src => src.AppUser.Photos.Select(i => new PhotoDto { URL = i.Url })));

        CreateMap<Activity, GetActivityDto>()
        .ForMember(a => a.HostUserName, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(att => att.IsHost)!.AppUser.UserName));
        CreateMap<Activity, Activity>().ForMember(dst => dst.Id, opts => opts.Ignore());
        CreateMap<CreateActivityDto, Activity>();

        CreateMap<EditActivityDto, Activity>();

        CreateMap<AppUser, UserProfileDto>()
        .ForMember(dst => dst.Image, opt => opt.MapFrom(src => src.Photos.SingleOrDefault(i => i.IsMain)!.Url))
        .ForMember(dst => dst.Photos, opt => opt.MapFrom(src => src.Photos.Select(i => new PhotoDto { URL = i.Url })));

    }
}